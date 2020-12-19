/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.9.2
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDoubleSpinBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QProgressBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QSpinBox>
#include <QtWidgets/QTabWidget>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QVBoxLayout *verticalLayout_3;
    QTabWidget *firstLevelTabs;
    QWidget *tab_3;
    QVBoxLayout *verticalLayout;
    QLabel *label_2;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label;
    QSpinBox *sourcesNumberSpinBox;
    QSpacerItem *horizontalSpacer;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_9;
    QDoubleSpinBox *poissonSpinBox;
    QSpacerItem *horizontalSpacer_4;
    QLabel *label_3;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_4;
    QSpinBox *processingNumberSpinBox;
    QSpacerItem *horizontalSpacer_2;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_7;
    QSpinBox *normMinSpinBox;
    QSpacerItem *horizontalSpacer_5;
    QHBoxLayout *horizontalLayout_7;
    QLabel *label_8;
    QSpinBox *normMaxSpinBox;
    QSpacerItem *horizontalSpacer_6;
    QLabel *label_5;
    QHBoxLayout *horizontalLayout_4;
    QLabel *label_6;
    QSpinBox *bufferSizeSpinBox;
    QSpacerItem *horizontalSpacer_3;
    QLabel *label_11;
    QHBoxLayout *horizontalLayout_9;
    QLabel *label_13;
    QSpinBox *totalTasksRequired;
    QSpacerItem *horizontalSpacer_7;
    QSpacerItem *verticalSpacer;
    QWidget *tab;
    QVBoxLayout *verticalLayout_4;
    QHBoxLayout *horizontalLayout_8;
    QVBoxLayout *verticalLayout_9;
    QLabel *label_10;
    QTableWidget *bufferStateTableWidget;
    QVBoxLayout *verticalLayout_7;
    QLabel *label_14;
    QTableWidget *stateTableWidget;
    QVBoxLayout *verticalLayout_11;
    QLabel *label_12;
    QTableWidget *processingStateTableWidget;
    QProgressBar *stepProgressBar;
    QHBoxLayout *horizontalLayout;
    QPushButton *nextStepButton;
    QWidget *tab_2;
    QVBoxLayout *verticalLayout_2;
    QTabWidget *tabWidget_2;
    QWidget *tab_4;
    QVBoxLayout *verticalLayout_5;
    QTableWidget *generatorStatTableWidget;
    QWidget *tab_5;
    QVBoxLayout *verticalLayout_6;
    QTableWidget *processorStatTableWidget;
    QProgressBar *autoProgressBar;
    QPushButton *startAutoButton;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(1273, 776);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        verticalLayout_3 = new QVBoxLayout(centralWidget);
        verticalLayout_3->setSpacing(6);
        verticalLayout_3->setContentsMargins(11, 11, 11, 11);
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        verticalLayout_3->setContentsMargins(0, 0, 0, 0);
        firstLevelTabs = new QTabWidget(centralWidget);
        firstLevelTabs->setObjectName(QStringLiteral("firstLevelTabs"));
        tab_3 = new QWidget();
        tab_3->setObjectName(QStringLiteral("tab_3"));
        verticalLayout = new QVBoxLayout(tab_3);
        verticalLayout->setSpacing(6);
        verticalLayout->setContentsMargins(11, 11, 11, 11);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        label_2 = new QLabel(tab_3);
        label_2->setObjectName(QStringLiteral("label_2"));
        QFont font;
        font.setPointSize(18);
        label_2->setFont(font);
        label_2->setScaledContents(false);
        label_2->setAlignment(Qt::AlignCenter);

        verticalLayout->addWidget(label_2);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setSpacing(6);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label = new QLabel(tab_3);
        label->setObjectName(QStringLiteral("label"));
        QFont font1;
        font1.setPointSize(12);
        label->setFont(font1);

        horizontalLayout_2->addWidget(label);

        sourcesNumberSpinBox = new QSpinBox(tab_3);
        sourcesNumberSpinBox->setObjectName(QStringLiteral("sourcesNumberSpinBox"));
        QFont font2;
        font2.setPointSize(10);
        sourcesNumberSpinBox->setFont(font2);
        sourcesNumberSpinBox->setMinimum(1);
        sourcesNumberSpinBox->setValue(4);
        sourcesNumberSpinBox->setDisplayIntegerBase(10);

        horizontalLayout_2->addWidget(sourcesNumberSpinBox);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer);


        verticalLayout->addLayout(horizontalLayout_2);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setSpacing(6);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        label_9 = new QLabel(tab_3);
        label_9->setObjectName(QStringLiteral("label_9"));
        label_9->setFont(font1);

        horizontalLayout_5->addWidget(label_9);

        poissonSpinBox = new QDoubleSpinBox(tab_3);
        poissonSpinBox->setObjectName(QStringLiteral("poissonSpinBox"));
        poissonSpinBox->setFont(font2);
        poissonSpinBox->setMaximum(1000);
        poissonSpinBox->setValue(3);

        horizontalLayout_5->addWidget(poissonSpinBox);

        horizontalSpacer_4 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_5->addItem(horizontalSpacer_4);


        verticalLayout->addLayout(horizontalLayout_5);

        label_3 = new QLabel(tab_3);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setFont(font);
        label_3->setAlignment(Qt::AlignCenter);

        verticalLayout->addWidget(label_3);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setSpacing(6);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        label_4 = new QLabel(tab_3);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setFont(font1);

        horizontalLayout_3->addWidget(label_4);

        processingNumberSpinBox = new QSpinBox(tab_3);
        processingNumberSpinBox->setObjectName(QStringLiteral("processingNumberSpinBox"));
        processingNumberSpinBox->setFont(font2);
        processingNumberSpinBox->setMinimum(1);
        processingNumberSpinBox->setValue(7);

        horizontalLayout_3->addWidget(processingNumberSpinBox);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_3->addItem(horizontalSpacer_2);


        verticalLayout->addLayout(horizontalLayout_3);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setSpacing(6);
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        label_7 = new QLabel(tab_3);
        label_7->setObjectName(QStringLiteral("label_7"));
        label_7->setFont(font1);

        horizontalLayout_6->addWidget(label_7);

        normMinSpinBox = new QSpinBox(tab_3);
        normMinSpinBox->setObjectName(QStringLiteral("normMinSpinBox"));
        normMinSpinBox->setFont(font2);
        normMinSpinBox->setMinimum(1);
        normMinSpinBox->setMaximum(1000);
        normMinSpinBox->setValue(5);

        horizontalLayout_6->addWidget(normMinSpinBox);

        horizontalSpacer_5 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_6->addItem(horizontalSpacer_5);


        verticalLayout->addLayout(horizontalLayout_6);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setSpacing(6);
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        label_8 = new QLabel(tab_3);
        label_8->setObjectName(QStringLiteral("label_8"));
        label_8->setFont(font1);

        horizontalLayout_7->addWidget(label_8);

        normMaxSpinBox = new QSpinBox(tab_3);
        normMaxSpinBox->setObjectName(QStringLiteral("normMaxSpinBox"));
        normMaxSpinBox->setFont(font2);
        normMaxSpinBox->setMinimum(1);
        normMaxSpinBox->setMaximum(1000);
        normMaxSpinBox->setValue(6);

        horizontalLayout_7->addWidget(normMaxSpinBox);

        horizontalSpacer_6 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_7->addItem(horizontalSpacer_6);


        verticalLayout->addLayout(horizontalLayout_7);

        label_5 = new QLabel(tab_3);
        label_5->setObjectName(QStringLiteral("label_5"));
        label_5->setFont(font);
        label_5->setAlignment(Qt::AlignCenter);

        verticalLayout->addWidget(label_5);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setSpacing(6);
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        label_6 = new QLabel(tab_3);
        label_6->setObjectName(QStringLiteral("label_6"));
        label_6->setFont(font1);

        horizontalLayout_4->addWidget(label_6);

        bufferSizeSpinBox = new QSpinBox(tab_3);
        bufferSizeSpinBox->setObjectName(QStringLiteral("bufferSizeSpinBox"));
        bufferSizeSpinBox->setFont(font2);
        bufferSizeSpinBox->setMinimum(1);
        bufferSizeSpinBox->setValue(4);

        horizontalLayout_4->addWidget(bufferSizeSpinBox);

        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_4->addItem(horizontalSpacer_3);


        verticalLayout->addLayout(horizontalLayout_4);

        label_11 = new QLabel(tab_3);
        label_11->setObjectName(QStringLiteral("label_11"));
        label_11->setFont(font);
        label_11->setAlignment(Qt::AlignCenter);

        verticalLayout->addWidget(label_11);

        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setSpacing(6);
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        label_13 = new QLabel(tab_3);
        label_13->setObjectName(QStringLiteral("label_13"));
        label_13->setFont(font1);

        horizontalLayout_9->addWidget(label_13);

        totalTasksRequired = new QSpinBox(tab_3);
        totalTasksRequired->setObjectName(QStringLiteral("totalTasksRequired"));
        totalTasksRequired->setMinimum(1);
        totalTasksRequired->setMaximum(1000000);
        totalTasksRequired->setValue(30000);

        horizontalLayout_9->addWidget(totalTasksRequired);

        horizontalSpacer_7 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_9->addItem(horizontalSpacer_7);


        verticalLayout->addLayout(horizontalLayout_9);

        verticalSpacer = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout->addItem(verticalSpacer);

        firstLevelTabs->addTab(tab_3, QString());
        tab = new QWidget();
        tab->setObjectName(QStringLiteral("tab"));
        verticalLayout_4 = new QVBoxLayout(tab);
        verticalLayout_4->setSpacing(6);
        verticalLayout_4->setContentsMargins(11, 11, 11, 11);
        verticalLayout_4->setObjectName(QStringLiteral("verticalLayout_4"));
        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setSpacing(6);
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        verticalLayout_9 = new QVBoxLayout();
        verticalLayout_9->setSpacing(6);
        verticalLayout_9->setObjectName(QStringLiteral("verticalLayout_9"));
        label_10 = new QLabel(tab);
        label_10->setObjectName(QStringLiteral("label_10"));
        label_10->setFont(font1);
        label_10->setAlignment(Qt::AlignCenter);

        verticalLayout_9->addWidget(label_10);

        bufferStateTableWidget = new QTableWidget(tab);
        bufferStateTableWidget->setObjectName(QStringLiteral("bufferStateTableWidget"));

        verticalLayout_9->addWidget(bufferStateTableWidget);


        horizontalLayout_8->addLayout(verticalLayout_9);

        verticalLayout_7 = new QVBoxLayout();
        verticalLayout_7->setSpacing(6);
        verticalLayout_7->setObjectName(QStringLiteral("verticalLayout_7"));
        label_14 = new QLabel(tab);
        label_14->setObjectName(QStringLiteral("label_14"));
        label_14->setFont(font1);
        label_14->setAlignment(Qt::AlignCenter);

        verticalLayout_7->addWidget(label_14);

        stateTableWidget = new QTableWidget(tab);
        stateTableWidget->setObjectName(QStringLiteral("stateTableWidget"));

        verticalLayout_7->addWidget(stateTableWidget);


        horizontalLayout_8->addLayout(verticalLayout_7);

        verticalLayout_11 = new QVBoxLayout();
        verticalLayout_11->setSpacing(6);
        verticalLayout_11->setObjectName(QStringLiteral("verticalLayout_11"));
        label_12 = new QLabel(tab);
        label_12->setObjectName(QStringLiteral("label_12"));
        label_12->setFont(font1);
        label_12->setAlignment(Qt::AlignCenter);

        verticalLayout_11->addWidget(label_12);

        processingStateTableWidget = new QTableWidget(tab);
        processingStateTableWidget->setObjectName(QStringLiteral("processingStateTableWidget"));

        verticalLayout_11->addWidget(processingStateTableWidget);


        horizontalLayout_8->addLayout(verticalLayout_11);


        verticalLayout_4->addLayout(horizontalLayout_8);

        stepProgressBar = new QProgressBar(tab);
        stepProgressBar->setObjectName(QStringLiteral("stepProgressBar"));
        stepProgressBar->setValue(0);
        stepProgressBar->setTextVisible(true);

        verticalLayout_4->addWidget(stepProgressBar);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(6);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        nextStepButton = new QPushButton(tab);
        nextStepButton->setObjectName(QStringLiteral("nextStepButton"));

        horizontalLayout->addWidget(nextStepButton);


        verticalLayout_4->addLayout(horizontalLayout);

        firstLevelTabs->addTab(tab, QString());
        tab_2 = new QWidget();
        tab_2->setObjectName(QStringLiteral("tab_2"));
        verticalLayout_2 = new QVBoxLayout(tab_2);
        verticalLayout_2->setSpacing(6);
        verticalLayout_2->setContentsMargins(11, 11, 11, 11);
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        tabWidget_2 = new QTabWidget(tab_2);
        tabWidget_2->setObjectName(QStringLiteral("tabWidget_2"));
        tab_4 = new QWidget();
        tab_4->setObjectName(QStringLiteral("tab_4"));
        verticalLayout_5 = new QVBoxLayout(tab_4);
        verticalLayout_5->setSpacing(6);
        verticalLayout_5->setContentsMargins(11, 11, 11, 11);
        verticalLayout_5->setObjectName(QStringLiteral("verticalLayout_5"));
        generatorStatTableWidget = new QTableWidget(tab_4);
        generatorStatTableWidget->setObjectName(QStringLiteral("generatorStatTableWidget"));

        verticalLayout_5->addWidget(generatorStatTableWidget);

        tabWidget_2->addTab(tab_4, QString());
        tab_5 = new QWidget();
        tab_5->setObjectName(QStringLiteral("tab_5"));
        verticalLayout_6 = new QVBoxLayout(tab_5);
        verticalLayout_6->setSpacing(6);
        verticalLayout_6->setContentsMargins(11, 11, 11, 11);
        verticalLayout_6->setObjectName(QStringLiteral("verticalLayout_6"));
        processorStatTableWidget = new QTableWidget(tab_5);
        processorStatTableWidget->setObjectName(QStringLiteral("processorStatTableWidget"));

        verticalLayout_6->addWidget(processorStatTableWidget);

        tabWidget_2->addTab(tab_5, QString());

        verticalLayout_2->addWidget(tabWidget_2);

        autoProgressBar = new QProgressBar(tab_2);
        autoProgressBar->setObjectName(QStringLiteral("autoProgressBar"));
        autoProgressBar->setValue(0);

        verticalLayout_2->addWidget(autoProgressBar);

        startAutoButton = new QPushButton(tab_2);
        startAutoButton->setObjectName(QStringLiteral("startAutoButton"));

        verticalLayout_2->addWidget(startAutoButton);

        firstLevelTabs->addTab(tab_2, QString());

        verticalLayout_3->addWidget(firstLevelTabs);

        MainWindow->setCentralWidget(centralWidget);

        retranslateUi(MainWindow);

        firstLevelTabs->setCurrentIndex(1);
        tabWidget_2->setCurrentIndex(0);


        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "SMO", Q_NULLPTR));
        label_2->setText(QApplication::translate("MainWindow", "Sources devices settings", Q_NULLPTR));
        label->setText(QApplication::translate("MainWindow", "Number of sources:", Q_NULLPTR));
        label_9->setText(QApplication::translate("MainWindow", "Poisson distribution parameter:", Q_NULLPTR));
        label_3->setText(QApplication::translate("MainWindow", "Processing devices settings", Q_NULLPTR));
        label_4->setText(QApplication::translate("MainWindow", "Number of devices:", Q_NULLPTR));
        label_7->setText(QApplication::translate("MainWindow", "Normal distribution min:", Q_NULLPTR));
        normMinSpinBox->setSuffix(QString());
        label_8->setText(QApplication::translate("MainWindow", "Normal distribution max:", Q_NULLPTR));
        label_5->setText(QApplication::translate("MainWindow", "Buffer settings", Q_NULLPTR));
        label_6->setText(QApplication::translate("MainWindow", "Size:", Q_NULLPTR));
        label_11->setText(QApplication::translate("MainWindow", "System settings", Q_NULLPTR));
        label_13->setText(QApplication::translate("MainWindow", "Total task to process: ", Q_NULLPTR));
        firstLevelTabs->setTabText(firstLevelTabs->indexOf(tab_3), QApplication::translate("MainWindow", "Settings", Q_NULLPTR));
        label_10->setText(QApplication::translate("MainWindow", "Buffer state", Q_NULLPTR));
        label_14->setText(QApplication::translate("MainWindow", "System state", Q_NULLPTR));
        label_12->setText(QApplication::translate("MainWindow", "Processing devices state", Q_NULLPTR));
        nextStepButton->setText(QApplication::translate("MainWindow", "Next step", Q_NULLPTR));
        firstLevelTabs->setTabText(firstLevelTabs->indexOf(tab), QApplication::translate("MainWindow", "Step by step", Q_NULLPTR));
        tabWidget_2->setTabText(tabWidget_2->indexOf(tab_4), QApplication::translate("MainWindow", "Generators statistics", Q_NULLPTR));
        tabWidget_2->setTabText(tabWidget_2->indexOf(tab_5), QApplication::translate("MainWindow", "Processors statistics", Q_NULLPTR));
        startAutoButton->setText(QApplication::translate("MainWindow", "Start", Q_NULLPTR));
        firstLevelTabs->setTabText(firstLevelTabs->indexOf(tab_2), QApplication::translate("MainWindow", "Auto mode", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
